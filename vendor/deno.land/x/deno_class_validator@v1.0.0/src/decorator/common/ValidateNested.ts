import { ValidationOptions } from "../ValidationOptions.ts";
import { ValidationMetadataArgs } from "../../metadata/ValidationMetadataArgs.ts";
import { ValidationTypes } from "../../validation/ValidationTypes.ts";
import { ValidationMetadata } from "../../metadata/ValidationMetadata.ts";
import { getMetadataStorage } from "../../metadata/MetadataStorage.ts";

/**
 * Objects / object arrays marked with this decorator will also be validated.
 */
export function ValidateNested(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  const opts: ValidationOptions = { ...validationOptions };
  const eachPrefix = opts.each ? "each value in " : "";
  opts.message = opts.message ||
    eachPrefix + "nested property $property must be either object or array";

  return function (object: object, propertyName: string): void {
    const args: ValidationMetadataArgs = {
      type: ValidationTypes.NESTED_VALIDATION,
      target: object.constructor,
      propertyName: propertyName,
      validationOptions: opts,
    };
    getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
  } as any;
}
