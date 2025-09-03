import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  UseBefore,
  Authorized,
} from 'routing-controllers';
import { Routing } from '@common/integrations';
import { HTTP } from '@common/utils/HTTPCodes';
import { ProjectSerializer } from '@admin/serializers/ProjectSerializer';
import ProjectService from '@admin/services/ProjectService';
import { json } from 'body-parser';
import { Service } from 'typedi';
import { validateWith } from '@common/schemas/validators/ValidateWith';
import { ProjectSchema } from '@common/schemas/ProjectSchema';
import { Roles } from '@common/entities/User';
import { MintoriaGallery } from '@common/types/Galleries';
import { TransferStateTypes } from '@common/entities/TransferRequest';

@Service()
@Authorized(Roles.ADMIN)
@Controller('/admin/projects')
export class ProjectController {
  @Get('/')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(ProjectSerializer.serializeFullProjectList)
  async getActive() {
    return ProjectService.getProjects();
  }

  @Get('/:id')
  @Routing.UseInterceptor(ProjectSerializer.serializeProjectDetails)
  async getOneByTemplateId(@Param('id') id: number) {
    const project = await ProjectService.getProjectDetails(id);

    if (!project) {
      return;
    }
    return project;
  }

  @Post('/')
  @UseBefore(
    validateWith(ProjectSchema.adminCreateTemplate, {
      stripUnknown: true,
    }),
  )
  @UseBefore(json())
  updateProject(
    @Body()
    body: {
      name: string;
      gallery: MintoriaGallery;
      artistAddress: string;
    },
  ) {
    return ProjectService.createProjectTemplate(body);
  }

  @Post('/:id/add-mainnet-id')
  @UseBefore(
    validateWith(ProjectSchema.addChainId, {
      stripUnknown: true,
    }),
  )
  @UseBefore(json())
  addProjectMainnetId(
    @Body() body: { chainId: number },
    @Param('id') id: number,
  ) {
    return ProjectService.addProjectMainnetId(id, body.chainId);
  }

  @Post('/:id/add-testnet-id')
  @UseBefore(
    validateWith(ProjectSchema.addChainId, {
      stripUnknown: true,
    }),
  )
  @UseBefore(json())
  addProjectTestnetId(
    @Body() body: { chainId: number },
    @Param('id') id: number,
  ) {
    return ProjectService.addProjectTestnetId(id, body.chainId);
  }

  @Post('/:id/transfer-request/:requestId')
  @UseBefore(
    validateWith(ProjectSchema.updateTransferRequest, {
      stripUnknown: true,
    }),
  )
  @UseBefore(json())
  updateTransferRequest(
    @Body() body: { state: TransferStateTypes; comments: string },
    @Param('requestId') requestId: number,
  ) {
    return ProjectService.updateTransferRequest(
      requestId,
      body.state,
      body.comments,
    );
  }
}
