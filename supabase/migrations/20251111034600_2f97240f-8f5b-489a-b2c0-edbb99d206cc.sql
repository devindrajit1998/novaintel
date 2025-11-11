-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create enum for project status
CREATE TYPE public.project_status AS ENUM ('New', 'In Progress', 'Completed', 'On Hold');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  client TEXT NOT NULL,
  industry TEXT NOT NULL,
  status project_status DEFAULT 'New',
  project_type TEXT,
  region TEXT,
  rfp_file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create case_studies table
CREATE TABLE public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  industry TEXT NOT NULL,
  result TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Create ai_insights table
CREATE TABLE public.ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;

-- Create business_challenges table
CREATE TABLE public.business_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  insight_id UUID REFERENCES public.ai_insights(id) ON DELETE CASCADE NOT NULL,
  challenge TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.business_challenges ENABLE ROW LEVEL SECURITY;

-- Create discovery_questions table
CREATE TABLE public.discovery_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  insight_id UUID REFERENCES public.ai_insights(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.discovery_questions ENABLE ROW LEVEL SECURITY;

-- Create value_propositions table
CREATE TABLE public.value_propositions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  insight_id UUID REFERENCES public.ai_insights(id) ON DELETE CASCADE NOT NULL,
  proposition TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.value_propositions ENABLE ROW LEVEL SECURITY;

-- Create proposals table
CREATE TABLE public.proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  template_type TEXT,
  content JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create trigger function for profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function for updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON public.case_studies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_insights_updated_at BEFORE UPDATE ON public.ai_insights
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON public.proposals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for projects
CREATE POLICY "Users can view their own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for case_studies
CREATE POLICY "Users can view all case studies"
  ON public.case_studies FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own case studies"
  ON public.case_studies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own case studies"
  ON public.case_studies FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own case studies"
  ON public.case_studies FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for ai_insights
CREATE POLICY "Users can view insights for their projects"
  ON public.ai_insights FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = ai_insights.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create insights for their projects"
  ON public.ai_insights FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = ai_insights.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update insights for their projects"
  ON public.ai_insights FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = ai_insights.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete insights for their projects"
  ON public.ai_insights FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = ai_insights.project_id
    AND projects.user_id = auth.uid()
  ));

-- RLS Policies for business_challenges
CREATE POLICY "Users can view challenges for their insights"
  ON public.business_challenges FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.ai_insights
    JOIN public.projects ON projects.id = ai_insights.project_id
    WHERE ai_insights.id = business_challenges.insight_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create challenges for their insights"
  ON public.business_challenges FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.ai_insights
    JOIN public.projects ON projects.id = ai_insights.project_id
    WHERE ai_insights.id = business_challenges.insight_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update challenges for their insights"
  ON public.business_challenges FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.ai_insights
    JOIN public.projects ON projects.id = ai_insights.project_id
    WHERE ai_insights.id = business_challenges.insight_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete challenges for their insights"
  ON public.business_challenges FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.ai_insights
    JOIN public.projects ON projects.id = ai_insights.project_id
    WHERE ai_insights.id = business_challenges.insight_id
    AND projects.user_id = auth.uid()
  ));

-- RLS Policies for discovery_questions
CREATE POLICY "Users can view questions for their insights"
  ON public.discovery_questions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.ai_insights
    JOIN public.projects ON projects.id = ai_insights.project_id
    WHERE ai_insights.id = discovery_questions.insight_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create questions for their insights"
  ON public.discovery_questions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.ai_insights
    JOIN public.projects ON projects.id = ai_insights.project_id
    WHERE ai_insights.id = discovery_questions.insight_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update questions for their insights"
  ON public.discovery_questions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.ai_insights
    JOIN public.projects ON projects.id = ai_insights.project_id
    WHERE ai_insights.id = discovery_questions.insight_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete questions for their insights"
  ON public.discovery_questions FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.ai_insights
    JOIN public.projects ON projects.id = ai_insights.project_id
    WHERE ai_insights.id = discovery_questions.insight_id
    AND projects.user_id = auth.uid()
  ));

-- RLS Policies for value_propositions
CREATE POLICY "Users can view propositions for their insights"
  ON public.value_propositions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.ai_insights
    JOIN public.projects ON projects.id = ai_insights.project_id
    WHERE ai_insights.id = value_propositions.insight_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create propositions for their insights"
  ON public.value_propositions FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.ai_insights
    JOIN public.projects ON projects.id = ai_insights.project_id
    WHERE ai_insights.id = value_propositions.insight_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update propositions for their insights"
  ON public.value_propositions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.ai_insights
    JOIN public.projects ON projects.id = ai_insights.project_id
    WHERE ai_insights.id = value_propositions.insight_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete propositions for their insights"
  ON public.value_propositions FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.ai_insights
    JOIN public.projects ON projects.id = ai_insights.project_id
    WHERE ai_insights.id = value_propositions.insight_id
    AND projects.user_id = auth.uid()
  ));

-- RLS Policies for proposals
CREATE POLICY "Users can view proposals for their projects"
  ON public.proposals FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = proposals.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create proposals for their projects"
  ON public.proposals FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = proposals.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update proposals for their projects"
  ON public.proposals FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = proposals.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete proposals for their projects"
  ON public.proposals FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = proposals.project_id
    AND projects.user_id = auth.uid()
  ));