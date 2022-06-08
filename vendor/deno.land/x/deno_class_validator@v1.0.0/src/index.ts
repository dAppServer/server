import { ValidationError } from "./validation/ValidationError.ts";
import { ValidatorOptions } from "./validation/ValidatorOptions.ts";
import { ValidationSchema } from "./validation-schema/ValidationSchema.ts";
import { getMetadataStorage } from "./metadata/MetadataStorage.ts";
import { Validator } from "./validation/Validator.ts";
import { getFromContainer } from "./container.ts";

// -------------------------------------------------------------------------
// Export everything api users needs
// -------------------------------------------------------------------------

export * from "./container.ts";
export * from "./decorator/decorators.ts";
export * from "./decorator/ValidationOptions.ts";
export * from "./validation/ValidatorConstraintInterface.ts";
export * from "./validation/ValidationError.ts";
export * from "./validation/ValidatorOptions.ts";
export * from "./validation/ValidationArguments.ts";
export * from "./validation/ValidationTypes.ts";
export * from "./validation/Validator.ts";
export * from "./validation-schema/ValidationSchema.ts";
export * from "./register-decorator.ts";
export * from "./metadata/MetadataStorage.ts";

// -------------------------------------------------------------------------
// Shortcut methods for api users
// -------------------------------------------------------------------------

/**
 * Validates given object.
 */
export function validate(
  object: object,
  validatorOptions?: ValidatorOptions,
): Promise<ValidationError[]>;

/**
 * Validates given object by a given validation schema.
 */
export function validate(
  schemaName: string,
  object: object,
  validatorOptions?: ValidatorOptions,
): Promise<ValidationError[]>;

/**
 * Validates given object by object's decorators or given validation schema.
 */
export function validate(
  schemaNameOrObject: object | string,
  objectOrValidationOptions?: object | ValidatorOptions,
  maybeValidatorOptions?: ValidatorOptions,
): Promise<ValidationError[]> {
  if (typeof schemaNameOrObject === "string") {
    return getFromContainer(Validator).validate(
      schemaNameOrObject,
      objectOrValidationOptions as object,
      maybeValidatorOptions,
    );
  } else {
    return getFromContainer(Validator).validate(
      schemaNameOrObject,
      objectOrValidationOptions as ValidatorOptions,
    );
  }
}

/**
 * Validates given object and reject on error.
 */
export function validateOrReject(
  object: object,
  validatorOptions?: ValidatorOptions,
): Promise<void>;

/**
 * Validates given object by a given validation schema and reject on error.
 */
export function validateOrReject(
  schemaName: string,
  object: object,
  validatorOptions?: ValidatorOptions,
): Promise<void>;

/**
 * Validates given object by object's decorators or given validation schema and reject on error.
 */
export function validateOrReject(
  schemaNameOrObject: object | string,
  objectOrValidationOptions?: object | ValidatorOptions,
  maybeValidatorOptions?: ValidatorOptions,
): Promise<void> {
  if (typeof schemaNameOrObject === "string") {
    return getFromContainer(Validator).validateOrReject(
      schemaNameOrObject,
      objectOrValidationOptions as object,
      maybeValidatorOptions,
    );
  } else {
    return getFromContainer(Validator).validateOrReject(
      schemaNameOrObject,
      objectOrValidationOptions as ValidatorOptions,
    );
  }
}

/**
 * Performs sync validation of the given object.
 * Note that this method completely ignores async validations.
 * If you want to properly perform validation you need to call validate method instead.
 */
export function validateSync(
  object: object,
  validatorOptions?: ValidatorOptions,
): ValidationError[];

/**
 * Validates given object by a given validation schema.
 * Note that this method completely ignores async validations.
 * If you want to properly perform validation you need to call validate method instead.
 */
export function validateSync(
  schemaName: string,
  object: object,
  validatorOptions?: ValidatorOptions,
): ValidationError[];

/**
 * Validates given object by object's decorators or given validation schema.
 * Note that this method completely ignores async validations.
 * If you want to properly perform validation you need to call validate method instead.
 */
export function validateSync(
  schemaNameOrObject: object | string,
  objectOrValidationOptions?: object | ValidatorOptions,
  maybeValidatorOptions?: ValidatorOptions,
): ValidationError[] {
  if (typeof schemaNameOrObject === "string") {
    return getFromContainer(Validator).validateSync(
      schemaNameOrObject,
      objectOrValidationOptions as object,
      maybeValidatorOptions,
    );
  } else {
    return getFromContainer(Validator).validateSync(
      schemaNameOrObject,
      objectOrValidationOptions as ValidatorOptions,
    );
  }
}

/**
 * Registers a new validation schema.
 */
export function registerSchema(schema: ValidationSchema): void {
  getMetadataStorage().addValidationSchema(schema);
}
