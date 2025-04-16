import { Application, ApplicationStatus, Company, Contact } from "@prisma/client"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Icon } from "./Icon"
import type { badgeVariants } from "./ui/badge"
import { VariantProps } from "class-variance-authority"
import { link } from "../shared/links"

const ApplicationsTable = ({ applications }: {
  applications: (Application & {
    applicationStatus: ApplicationStatus,
    company: Company & {
      contacts: Contact[]
    },
  })[]
}) => {
  return (
    <Table>
      <TableHeader>
        <TableHead className="w-[100px]">Status</TableHead>
        <TableHead>Date Applied</TableHead>
        <TableHead>Job Title</TableHead>
        <TableHead>Company</TableHead>
        <TableHead>Contact</TableHead>
        <TableHead>Salary Range</TableHead>
        <TableHead></TableHead>
      </TableHeader>
      <TableBody>
        {applications.map(application => (
        <TableRow>
          <TableCell>
              <Badge variant={application.applicationStatus?.status.toLowerCase() as VariantProps<typeof badgeVariants>['variant']}>
                {application.applicationStatus?.status}
              </Badge>
          </TableCell>
            <TableCell>
              {application.dateApplied?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
              })}
            </TableCell>
            <TableCell>
              {application.jobTitle}
            </TableCell>
            <TableCell>
              {application.company.name}
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{application.company.contacts[0].firstName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              {application.company.contacts[0].firstName} {application.company.contacts[0].lastName}
            </TableCell>
            <TableCell>
              ${application.salaryMin}-${application.salaryMax}
            </TableCell>
            <TableCell>
              <a href={link("/applications/:id", { id: application.id })}>
                <Icon id="view" />
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { ApplicationsTable }