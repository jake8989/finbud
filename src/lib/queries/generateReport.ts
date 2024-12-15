import { gql } from "@apollo/client";

export const GENERATE_REPORT = gql`
  query GenerateReport($report: ReportInput!) {
    GenerateReport(report: $report) {
      success
      message
      reportId
    }
  }
`;
