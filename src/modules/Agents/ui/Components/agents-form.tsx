"use client";

import { trpc } from "@/trpc/client";
import { agentsInsertSchema } from "../../schema";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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
}

export const AgentsForm = ({ onSuccess, onCancel }: AgentsFormProps) => {
  const queryClient = useQueryClient();

  const createAgent = trpc.agents.create.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: trpc.agents.getMany.queryKey(),
      });
      toast.success("Agent saved!");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<ReturnType<typeof agentsInsertSchema.parse>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: "",
      instruction: "",
    },
  });

  const isPending = createAgent.mutate.isLoading;

  const onSubmit = (values: ReturnType<typeof agentsInsertSchema.parse>) => {
    createAgent.mutate(values);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          seed={form.watch("name")}
          varient="botttsNeutral" // fixed typo from varient
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
                <Textarea {...field} placeholder="You are a helpful assistant…" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-2">
          {onCancel && (
            <Button
              variant="ghost"
              disabled={isPending}
              type="button"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};
