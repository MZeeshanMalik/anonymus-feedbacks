/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";
type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};
function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const { toast } = useToast();
  const formatDate = (dateStr: Date) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(
      `/api/delete-message/${message._id}`
    );
    toast({
      title: response.data.message,
    });
    onMessageDelete(message._id);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-transparent bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-indigo-50">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Anonymous Message
          </CardTitle>
          <CardDescription className="text-xs text-gray-500 mt-1">
            Received {formatDate(message.createdAt)}
          </CardDescription>{" "}
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white backdrop-blur-sm border-none shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg opacity-80 z-0"></div>
            <AlertDialogHeader className="relative z-10">
              <AlertDialogTitle className="text-gray-900">
                Delete this message?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                This action cannot be undone. This message will be permanently
                removed from your inbox.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="relative z-10">
              <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-100">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      <CardContent className="py-4">
        <div className="bg-white p-4 rounded-md border border-gray-100 shadow-sm">
          <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex justify-between text-xs text-gray-500">
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          Anonymous feedback
        </span>
      </CardFooter>
    </Card>
  );
}

export default MessageCard;
