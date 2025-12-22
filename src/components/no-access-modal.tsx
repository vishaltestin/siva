import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
    open: boolean;
    onClose: () => void;
};

export function NoAccessModal({ open, onClose }: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Access Restricted</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">
                    You do not have access to this collection. Please contact the admin.
                </p>

                <div className="mt-4 flex justify-end">
                    <Button onClick={onClose}>Okay</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
