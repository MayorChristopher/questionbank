import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Check } from "lucide-react";
import QRCode from "qrcode.react";

const ShareModal = ({ isOpen, onClose, document }) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  if (!document || !document.publicUrl) {
    return null;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(document.publicUrl);
    setCopied(true);
    toast({ title: "Link copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Document: {document.title}</DialogTitle>
          <DialogDescription>
            Share this public link with anyone. They won't need an account to
            view it.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 my-4">
          <Input value={document.publicUrl} readOnly />
          <Button onClick={copyToClipboard} size="icon">
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex justify-center p-4 bg-white rounded-lg">
          <QRCode value={document.publicUrl} size={128} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
