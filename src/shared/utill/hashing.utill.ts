import * as bcrypt from 'bcrypt';

export async function hashPayload(payload: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(payload, salt);
  return hash;
}

export async function compareHash(
  rawPayload: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(rawPayload, hash);
}
