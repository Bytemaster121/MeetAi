"use client";

import { useTRPC } from "@/trpc/client";
import { AgentsGetOne } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsInsertSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface AgentsFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentsGetOne;
}

export const AgentsForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: AgentsFormProps) => {
  const trpc = useTRPC(); // ✅ context-aware client
  const queryClient = useQueryClient();
  const isEdit = !!initialValues?.id;

  const createAgent = useMutation({
    mutationFn: (input: z.infer<typeof agentsInsertSchema>) =>
      trpc.agents.create.mutate(input),
    onSuccess: async () => {
      const queryKey = trpc.agents.getMany.queryOptions().queryKey;
      console.log("Invalidating queryKey:", queryKey);

      await queryClient.invalidateQueries({ queryKey });
      toast.success("Agent created successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instruction: initialValues?.instruction ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      console.log("TODO: Update agent logic here");
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          seed={form.watch("name")}
          varient="botttsNeutral"
          className="border size-16"
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Math Tutor" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="instruction"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instruction</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="You are a helpful math assistant that can answer questions and help with tasks."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-2">
          <Button type="submit" disabled={createAgent.isPending}>
            {isEdit ? "Update Agent" : "Create Agent"}
          </Button>
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};