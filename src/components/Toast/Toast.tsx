import React from 'react';
import { useUI } from '../../context/UIContext';

export const Toast: React.FC = () => {
  const { toast } = useUI();
  if (!toast.visible) return null;

  return (
    <div id="toast-notification" role="status" aria-live="polite">
      <strong id="toast-title">{toast.title}</strong>
      <span id="toast-msg">{toast.msg}</span>
    </div>
  );
};
