import { FormEvent } from 'react';
import { z } from 'zod';

export const handleSubmit = <T extends z.ZodObject<z.ZodRawShape>>(
  e: FormEvent,
  Schema: T,
  keys: [keyof z.ZodRawShape]
): [z.infer<T> | null, null | Object] => {
  e.preventDefault();
  try {
    let _form: Record<keyof z.ZodRawShape, any> = Object.create({});
    const form = e.target as HTMLFormElement
    for (let i = 0; i < keys.length; i++) {
      _form[keys[i]] = form[keys[i]].value;
    }
    return [Schema.parse(_form) as z.infer<T>, null];
  } catch (err: any) {
    const error: Partial<Record<'path' | 'message', any>> = {};
    if(err.issues) {
      error['path'] = err?.issues[0]?.path;
      error['message'] = err?.issues[0]?.message;
      return [null, error];
    } else {
      return [null, null];
    }
  }
}