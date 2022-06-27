import { ValidationOptions } from "../ValidationOptions.ts";
import { ValidationMetadataArgs } from "../../metadata/ValidationMetadataArgs.ts";
import { ValidationTypes } from "../../validation/ValidationTypes.ts";
import { ValidationMetadata } from "../../metadata/ValidationMetadata.ts";
import { getMetadataStorage } from "../../metadata/MetadataStorage.ts";

/**
 * Resolve promise before validation
 */
export function ValidatePromise(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: object, propertyName: string): void {
    const args: ValidationMetadataArgs = {
      type: ValidationTypes.PROMISE_VALIDATION,
      target: object.constructor,
      propertyName: propertyName,
      validationOptions: validationOptions,
    };
    getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
  } as any;
}
