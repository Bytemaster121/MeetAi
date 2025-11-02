"use client";

import { trpc } from "@/trpc/client";
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
import { meetingInsertSchema, meetingUpdateSchema } from "../../schemas";
import { MeetingGetOne } from "../../types"

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const utils = trpc.useUtils();
  const isEditMode = !!initialValues;

  // Create mutation
  const createMeeting = trpc.meetings.create.useMutation({
    onSuccess: async (data) => {
      await utils.meetings.getMany.invalidate();
      toast.success("Meeting created successfully!");
      onSuccess?.(data.id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Update mutation
  const updateMeeting = trpc.meetings.update.useMutation({
    onSuccess: async () => {
      await utils.meetings.getMany.invalidate();
      await utils.meetings.getOne.invalidate();
      toast.success("Meeting updated successfully!");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Use appropriate schema based on mode
  const schema = isEditMode ? meetingUpdateSchema : meetingInsertSchema;
  type FormValues = z.infer<typeof schema>;

  // Correct field mapping for initial values
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isEditMode
      ? {
          name: initialValues?.name,
          agentId: initialValues?.agentId ?? "",
        }
      : {
          name: "",
          agentId: "",
        },
  });

  const isPending = createMeeting.isPending || updateMeeting.isPending;

  // Fixed mutation schemas
  const onSubmit = (values: FormValues) => {
    if (isEditMode) {
      updateMeeting.mutate({
        ...values,
        id: initialValues?.id ?? "",
      });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
          name="agentId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Agent ID" />
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