import { IncomingMessage, ServerResponse} from 'http'

export default function handler(req: IncomingMessage, res: any) {
  res.status(200).json({ User: 'John Doe' });
}