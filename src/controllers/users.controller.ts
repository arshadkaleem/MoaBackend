import { Request, Response } from "express"

export const login = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    data: {
      name: "Chishiya",
    }
  })
}

export default {
  login,
}
