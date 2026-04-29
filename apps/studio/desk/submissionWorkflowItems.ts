export const submissionWorkflowStatuses = [
  { title: "New", value: "new" },
  { title: "In Review", value: "inReview" },
  { title: "Contacted", value: "contacted" },
  { title: "Confirmed", value: "confirmed" },
  { title: "Rejected / Not Eligible", value: "rejected" },
  { title: "Needs Follow-up", value: "needsFollowUp" },
  { title: "Archived", value: "archived" },
]

const contactSubmissionWorkflowItems = (S: any) =>
  submissionWorkflowStatuses.map((status) =>
    S.listItem()
      .title(status.title)
      .child(
        S.documentList()
          .title(`Contact Submissions — ${status.title}`)
          .filter('_type == "contactSubmission" && workflowStatus == $status')
          .params({ status: status.value })
          .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
      )
  )

const eventRegistrationWorkflowItems = (S: any) =>
  submissionWorkflowStatuses.map((status) =>
    S.listItem()
      .title(status.title)
      .child(
        S.documentList()
          .title(`Event Registrations — ${status.title}`)
          .filter('_type == "eventRegistration" && workflowStatus == $status')
          .params({ status: status.value })
          .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
      )
  )

export const submissionWorkflowListItem = (S: any) =>
  S.listItem()
    .title("Submissions")
    .child(
      S.list()
        .title("Submissions")
        .items([
          S.listItem()
            .title("Contact Submissions")
            .child(
              S.list()
                .title("Contact Submissions")
                .items([
                  S.listItem()
                    .title("All Contact Submissions")
                    .child(
                      S.documentList()
                        .title("All Contact Submissions")
                        .filter('_type == "contactSubmission"')
                        .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
                    ),
                  S.divider(),
                  ...contactSubmissionWorkflowItems(S),
                ])
            ),

          S.listItem()
            .title("Event Registrations")
            .child(
              S.list()
                .title("Event Registrations")
                .items([
                  S.listItem()
                    .title("All Event Registrations")
                    .child(
                      S.documentList()
                        .title("All Event Registrations")
                        .filter('_type == "eventRegistration"')
                        .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
                    ),
                  S.divider(),
                  ...eventRegistrationWorkflowItems(S),
                ])
            ),
        ])
    )
