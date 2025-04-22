import { ApplicationsForm } from "@/app/components/ApplicationsForm"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/app/components/ui/breadcrumb"
import { InteriorLayout } from "@/app/layouts/InteriorLayout"
import { db } from "@/db"
import { AppContext } from "@/worker"

const New = async ({ ctx }: { ctx: AppContext }) => {
  const statuses = await db.applicationStatus.findMany()

  const contacts = await db.contact.findMany({
    where: {
      companyId: null,
      userId: ctx.user?.id || ""
    }
  })

  return (
    <InteriorLayout>
      <div className="mb-12 -mt-7 pl-[120px]">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/applications">Applications</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Add an Application</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mx-page-side pb-6 mb-8 border-b-1 border-border">
        <h1 className="page-title">New Application</h1>
        <p className="page-description">Create a new application</p>
      </div>
      <ApplicationsForm statuses={statuses} contacts={contacts} />
    </InteriorLayout>
  )
}

export { New }