// src/components/ResetProgressButton.tsx
import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";

type ResetProgressButtonProps = {
  onConfirm: () => void;
  label?: string;
};

export function ResetProgressButton({ onConfirm, label = "Reset progress" }: ResetProgressButtonProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    setOpen(false);
    onConfirm();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600/90 text-red-50 border border-red-700 hover:bg-red-700 active:scale-[0.97] transition-all duration-150"
      >
        {label}
      </button>

      <ConfirmDialog
        open={open}
        title="Reset all progress?"
        description="This will permanently delete all completed objectives for this lesson. This action cannot be undone."
        confirmLabel="Yes, reset"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}