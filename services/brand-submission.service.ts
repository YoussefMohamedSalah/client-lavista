// Import constants and utility functions from their respective modules.
import { BASE_API_URL } from "@/constants/constants"; // Base API URL constant for network requests.
import { BRAND_SUBMISSIONS_ENDPOINT } from "@/constants/routes"; // Endpoint for brand submissions.
import { fetchWrapper } from "@/helpers/fetch-wrapper"; // Wrapper for fetch API to simplify network requests.

// Define the brandSubmissionService object to encapsulate brand related operations.
export const brandSubmissionService = {
  rejectBrandSubmission, // Expose the rejectBrandSubmission function as part of the service.
  acceptBrandSubmission, // Expose the acceptBrandSubmission function as part of the service.
};

// Construct the full URL for brand related operations by concatenating base URL and endpoint.
const BRAND_SUBMISSIONS_URL = `${BASE_API_URL}${BRAND_SUBMISSIONS_ENDPOINT}`;

/**
 * Asynchronously rejects a brand submission.
 *
 * @param {number} id - The unique identifier of the brand submission to be rejected.
 * @param {string} rejectReason - The reason for rejecting the brand submission.
 */
async function rejectBrandSubmission(id: number, rejectReason: string) {
  // Make a POST request to the specific URL for rejecting a submission,
  // along with the reason for rejection.
  return await fetchWrapper.post(`${BRAND_SUBMISSIONS_URL}${id}/reject-submission/`, {
    reject_reason: rejectReason,
  });
}

/**
 * Submits a request to approve a brand submission.
 *
 * This function sends a POST request to the server to approve a brand submission
 * identified by a unique ID. The server's response to this request is returned.
 *
 * @param id - The unique identifier of the brand submission to be approved.
 *
 */
async function acceptBrandSubmission(id: number) {
  return await fetchWrapper.post(
    `${BRAND_SUBMISSIONS_URL}${id}/approve-submission/`, null
  );
}
