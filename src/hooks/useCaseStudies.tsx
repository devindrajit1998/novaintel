import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useCaseStudies() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ["case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createCaseStudy = useMutation({
    mutationFn: async (caseStudy: {
      title: string;
      industry: string;
      result: string;
      description: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("case_studies")
        .insert({ ...caseStudy, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
      toast({ title: "Case study created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error creating case study", description: error.message, variant: "destructive" });
    },
  });

  const updateCaseStudy = useMutation({
    mutationFn: async ({ id, ...updates }: any) => {
      const { data, error } = await supabase
        .from("case_studies")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
      toast({ title: "Case study updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error updating case study", description: error.message, variant: "destructive" });
    },
  });

  const deleteCaseStudy = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("case_studies").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["case-studies"] });
      toast({ title: "Case study deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error deleting case study", description: error.message, variant: "destructive" });
    },
  });

  return {
    caseStudies,
    isLoading,
    createCaseStudy: createCaseStudy.mutate,
    updateCaseStudy: updateCaseStudy.mutate,
    deleteCaseStudy: deleteCaseStudy.mutate,
  };
}
