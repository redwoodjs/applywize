"use client"

import { Contact } from "@prisma/client"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Icon } from "./Icon"
import { toast } from "sonner"
import { deleteContact } from "../pages/applications/actions"

const ContactCard = ({ contact, isEditable = true }: { contact: Contact, isEditable?: boolean }) => {
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = await deleteContact(contact.id);
    if (result.error) {
      toast.error("Yikes! Couldn't delete.");
    } else {
      toast.success("Contact deleted");
    }
  }

  return (
    <div className="relative group/card flex items-center gap-4 mb-6">
      {isEditable && (
        <div className="hidden group-hover/card:block pr-10 absolute top-1 -left-[37px]">
          <button role="button"
            className="hover:bg-black cursor-pointer text-white fill-current rounded-full bg-destructive p-1"
            onClick={(e) => handleDelete(e)}
          >
            <Icon id="close" size={16} />
          </button>
        </div>
      )}
      <div>
        <Avatar className="size-10">
          <AvatarFallback>
            {contact.firstName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{contact.firstName} {contact.lastName}</p>
        <p className="text-sm text-zinc-500">{contact.role}</p>
      </div>
      <div>
        <a href={`mailto:${contact.email}`}><Icon id="email" size={24} /></a>
      </div>
    </div>
  )
}

export { ContactCard }