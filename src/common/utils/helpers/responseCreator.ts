import { InfoResponseType } from "../../../rotes/auth-router"
import { ResultCode } from "../../constants"

export const createResponse = (message: string, resultCode: ResultCode): InfoResponseType => {
  return { message: message, resultCode: resultCode }
}
