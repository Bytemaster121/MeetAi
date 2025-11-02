"use client";

import { trpc } from "@/trpc/client";
import { agentsInsertSchema, agentsUpdateSchema } from "../../schema";
import { AgentGetOne } from "../../types";
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
import { z } from "zod";

interface AgentsFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export const AgentsForm = ({ onSuccess, onCancel, initialValues }: AgentsFormProps) => {
  const utils = trpc.useUtils();
  const isEditMode = !!initialValues;

  // Create mutation
  const createAgent = trpc.agents.create.useMutation({
    onSuccess: async () => {
      await utils.agents.getMany.invalidate();
      toast.success("Agent created successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Update mutation
  const updateAgent = trpc.agents.update.useMutation({
    onSuccess: async () => {
      await utils.agents.getMany.invalidate();
      await utils.agents.getOne.invalidate();
      toast.success("Agent updated successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Use appropriate schema based on mode
  const schema = isEditMode ? agentsUpdateSchema : agentsInsertSchema;
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isEditMode
      ? {
          id: initialValues.id,
          name: initialValues.name,
          instruction: initialValues.instruction,
        }
      : {
          name: "",
          instruction: "",
        },
  } as any); // Temporary fix for type issue

  const isPending = createAgent.isPending || updateAgent.isPending;

  const onSubmit = (values: FormValues) => {
    if (isEditMode) {
      updateAgent.mutate(values as z.infer<typeof agentsUpdateSchema>);
    } else {
      createAgent.mutate(values as z.infer<typeof agentsInsertSchema>);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          seed={form.watch("name") || "default"}
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
                  placeholder="You are a helpful assistant…"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button
              variant="ghost"
              disabled={isPending}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isPending ? "Saving..." : isEditMode ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
