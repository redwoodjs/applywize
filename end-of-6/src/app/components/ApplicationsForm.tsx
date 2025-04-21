"use client"

import { Button } from "./ui/button"
import { DatePicker } from "./ui/DatePicker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ApplicationStatus } from "@prisma/client"
import { createApplication } from "@/app/pages/applications/actions"

const ApplicationsForm = ({ statuses }: { statuses: ApplicationStatus[] }) => {

  const handleSubmit = async (formData: FormData) => {
    const result = await createApplication(formData);
    if (result.success) {
      window.location.href = `/applications`;
    } else {
      console.error(result.error);
    }
  }

  return (
    <form action={handleSubmit}>
      <div className="grid grid-cols-2 gap-[200px] px-page-side mb-[75px]">
        {/* left side */}
        <div>
          <div>
              <h2>Company Information</h2>
              <div className="field">
                <label htmlFor="company">Company Name</label>
                <p className="input-description">What company caught your eye?</p>
                <input type="text" id="company" name="company" />
              </div>
              <div className="field">
                <label htmlFor="jobTitle">Job Title</label>
                <p className="input-description">What's the job you're after?</p>
                <input type="text" id="jobTitle" name="jobTitle" />
              </div>
              <div className="field">
                <label htmlFor="jobDescription">Job Description / Requirements</label>
                <p className="input-description">What are they looking for?</p>
                <textarea id="jobDescription" name="jobDescription" />
              </div>
              <div className="field">
                <div className="label">Salary Range</div>
                <p className="input-description">What does the pay look like?</p>
                <div className="flex gap-4">
                  <div className="flex-1 label-inside">
                    <label htmlFor="salaryMin">Min</label>
                    <input type="text" id="salaryMin" name="salaryMin" />
                  </div>
                  <div className="flex-1 label-inside">
                    <label htmlFor="salaryMax">Max</label>
                    <input type="text" id="salaryMax" name="salaryMax" />
                  </div>
                </div>
              </div>
              <div className="field">
                <label htmlFor="url">Application URL</label>
                <p className="input-description">What does the pay look like?</p>
                <input type="text" id="url" name="url" />
              </div>
              <div className="field">
                  <Button type="submit">
                    Create
                  </Button>
              </div>
            </div>
          </div>

          {/* right side */}
          <div>
            <div className="box">
              <label>Application submission date</label>
              <DatePicker name="dateApplied" />
          </div>

          <div className="box">
            <label htmlFor="application-status">Application Status</label>
            <Select name="statusId">
              <SelectTrigger>
                <SelectValue placeholder="Select a Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses && statuses.map(status => (
                  <SelectItem value={status.status}>{status.status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="box">
            <h3>Contacts</h3>
            <p className="input-description">Invite your team members to collaborate.</p>
            <div>
              Contact Card
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export {ApplicationsForm}