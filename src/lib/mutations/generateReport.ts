import { gql } from "@apollo/client";

export const GENERATE_REPORT = gql`
  mutation GenerateReport($report: ReportInput!) {
    generateReport(report: $report) {
      success
      message
      reportId
    }
  }
`;
