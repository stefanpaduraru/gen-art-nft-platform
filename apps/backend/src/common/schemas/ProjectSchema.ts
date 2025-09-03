import * as Joi from 'joi';
import { MintoriaGalleries } from '@common/types/Galleries';
import { ScriptTypes } from '@common/types/ScriptType';
import { DropTypes } from '@common/entities/Project';

export const ProjectSchema = {
  createOrUpdate: {
    body: Joi.object({
      name: Joi.string().required().min(3),
      description: Joi.string().required().allow(''),
      website: Joi.string().optional().default('').allow(''),
      maxIterations: Joi.number().required().min(1).max(100000),
      pricePerTokenInWei: Joi.string().required(),
      script: Joi.optional().default('').allow(''),
      startingAt: Joi.date(),
      collaboratorAddress: Joi.string().optional().allow(''),
      collaboratorPercentage: Joi.number().optional().default(0),
      maxTokensPerAddress: Joi.number().optional().default(0),
      royaltyFeePercentage: Joi.number().optional().default(5),
      license: Joi.string().optional().default('').allow(''),
      active: Joi.boolean().default(false),
      paused: Joi.boolean().default(true),
      useStorage: Joi.boolean().default(false),
      baseURI: Joi.string()
        .optional()
        .default('')
        .allow('')
        .allow(null),
      baseIpfsURI: Joi.string()
        .optional()
        .default('')
        .allow('')
        .allow(null),
      features: Joi.array().optional().default([]),
      termsAccepted: Joi.boolean().optional().default(false),
      metadata: Joi.object({
        aspectRatio: Joi.number().optional(),
        scriptType: Joi.string()
          .valid(ScriptTypes.JAVASCRIPT, ScriptTypes.P5JS)
          .optional(),
      }),
    }),
  },
  adminCreateOrUpdate: {
    body: Joi.object({
      name: Joi.string().optional(),
      description: Joi.string().optional().default('').allow(''),
      website: Joi.string().optional().default('').allow(''),
      maxIterations: Joi.number()
        .optional()
        .default(0)
        .min(0)
        .max(100000),
      pricePerTokenInWei: Joi.string().optional().default(0),
      script: Joi.optional().default('').allow('').default(''),
      startingAt: Joi.date(),
      collaboratorAddress: Joi.string()
        .optional()
        .allow('')
        .default(''),
      collaboratorPercentage: Joi.number().optional().default(0),
      royaltyFeePercentage: Joi.number().optional().default(5),
      license: Joi.string().optional().default(''),
      active: Joi.boolean().default(false),
      paused: Joi.boolean().default(true),
      useStorage: Joi.boolean().default(false),
      baseURI: Joi.string().optional().default('').allow(''),
      baseIpfsURI: Joi.string().optional().default('').allow(''),
      // captchaResponse: Joi.string(),
    }),
  },
  adminCreateTemplate: {
    body: Joi.object({
      name: Joi.string().required().min(5),
      gallery: Joi.string()
        .required()
        .allow(
          MintoriaGalleries.Selected,
          MintoriaGalleries.OpenWorld,
        ),
      artistAddress: Joi.string().required(),
    }),
  },
  createTemplate: {
    body: Joi.object({
      name: Joi.string().required().min(5),
      pricePerTokenInWei: Joi.string().required().allow(0),
      gallery: Joi.string()
        .required()
        .allow(
          MintoriaGalleries.Selected,
          MintoriaGalleries.OpenWorld,
        ),
    }),
  },
  addChainId: {
    body: Joi.object({
      chainId: Joi.number().required(),
    }),
  },
  updateTransferRequest: {
    body: Joi.object({
      state: Joi.string()
        .allow('approved')
        .allow('denied')
        .required(),
      comments: Joi.string().allow(''),
    }),
  },
  vote: {
    body: Joi.object({
      token: Joi.string().min(120).required(),
    }),
  },
  settings: {
    body: Joi.object({
      dropType: Joi.string()
        .required()
        .allow(DropTypes.Fixed, DropTypes.Dutch),
      dropDetails: Joi.string().required().allow('').allow(null),
      additionalDetails: Joi.string()
        .required()
        .allow('')
        .allow(null),
      renderDelay: Joi.number().required().default(2),
    }),
  },
};
