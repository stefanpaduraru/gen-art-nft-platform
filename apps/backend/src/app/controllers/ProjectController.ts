import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  UseBefore,
  CurrentUser,
  HeaderParam,
} from 'routing-controllers';
import { Errors, Routing } from '@common/integrations';
import { HTTP } from '@common/utils/HTTPCodes';
import { ProjectSerializer } from '@app/serializers/ProjectSerializer';
import ProjectService from '@app/services/ProjectService';
import { json } from 'body-parser';
import { Service } from 'typedi';
import { validateWith } from '@common/schemas/validators/ValidateWith';
import { ProjectSchema } from '@common/schemas/ProjectSchema';
import { User } from '@common/entities/User';
import { Networks } from '@common/types/Network';
import {
  MintoriaGalleries,
  MintoriaGallery,
} from '@common/types/Galleries';
import { Project, ProjectSettings } from '@common/entities/Project';
import { MyProjectSerializer } from '@app/serializers/MyProjectSerializer';

@Service()
@Controller('/projects')
export class ProjectController {
  @Get('/selected')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(ProjectSerializer.serializeShortProjectList)
  async getMintoriaSelected() {
    const projects = await ProjectService.getGalleryProjects(
      MintoriaGalleries.Selected,
    );
    return projects || [];
  }

  @Get('/selected/:id')
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(ProjectSerializer.serializeProjectDetails)
  async getMainnetSelected(@Param('id') id: number) {
    return ProjectService.getProjectDetails(
      id,
      Networks.Mainnet,
      MintoriaGalleries.Selected,
    );
  }

  @Get('/open-world')
  @Routing.HttpCode(HTTP.OK)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(ProjectSerializer.serializeFullProjectList)
  async getMintoriaOpenWorld() {
    const projects = await ProjectService.getGalleryProjects(
      MintoriaGalleries.OpenWorld,
    );
    return projects || [];
  }

  @Get('/open-world/:id')
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  @Routing.UseInterceptor(ProjectSerializer.serializeProjectDetails)
  async getMainnetOpenWorld(@Param('id') id: number) {
    return ProjectService.getProjectDetails(
      id,
      Networks.Mainnet,
      MintoriaGalleries.OpenWorld,
    );
  }

  @Get('/my')
  @UseBefore(json())
  @Routing.UseInterceptor(MyProjectSerializer.serializeMyProjects)
  async getArtistProjects(
    @CurrentUser({ required: true }) user: User,
  ) {
    const projects = await ProjectService.getProjectsByArtistAddress(
      user.address,
    );
    return projects || [];
  }

  @Post('/my/new')
  @Routing.UseInterceptor(
    MyProjectSerializer.serializeControllerProjectDetails,
  )
  /* @UseBefore(
    validateWith(ProjectSchema.createTemplate, {
      stripUnknown: true,
    }),
  ) */
  @UseBefore(json())
  createProject(
    @Body()
    body: {
      name: string;
      pricePerTokenInWei: string;
      gallery: MintoriaGallery;
    },
    @CurrentUser({ required: true }) user: User,
    @HeaderParam('X-Recaptcha-Response') captchaChallenge: string,
  ) {
    return ProjectService.createProjectForArtist(
      body,
      user,
      captchaChallenge,
    );
  }

  @Get('/my/:id/details')
  @Routing.UseInterceptor(
    MyProjectSerializer.serializeMyProjectDetails,
  )
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  async getMyProjectDetails(
    @CurrentUser({ required: true }) user: User,
    @Param('id') id: number,
  ) {
    const project = await ProjectService.getMyProjectDetails(
      id,
      user,
    );
    if (!project) {
      throw new Errors.NotFound();
    }
    return project;
  }

  @Get('/my/:id/edit')
  @Routing.UseInterceptor(MyProjectSerializer.serializeProjectEdit)
  @Routing.OnUndefined(HTTP.NOT_FOUND)
  async getMyProjectEdit(
    @CurrentUser({ required: true }) user: User,
    @Param('id') id: number,
  ) {
    const project = await ProjectService.getMyProjectDetails(
      id,
      user,
    );
    if (!project) {
      throw new Errors.NotFound();
    }
    return project;
  }

  @Post('/:id')
  @Routing.UseInterceptor(MyProjectSerializer.serializeProjectEdit)
  @UseBefore(
    validateWith(ProjectSchema.createOrUpdate, {
      stripUnknown: true,
    }),
  )
  @UseBefore(json())
  updateProject(
    @Body() body: Partial<Project>,
    @Param('id') id: number,
    @CurrentUser({ required: true }) user: User,
    @HeaderParam('X-Recaptcha-Response') captchaChallenge: string,
  ) {
    const values = {
      ...body,
      metadata: JSON.stringify(body.metadata),
    };
    return ProjectService.updateProjectForArtist(
      id,
      values,
      user,
      captchaChallenge,
    );
  }

  @Post('/:id/vote')
  @UseBefore(
    validateWith(ProjectSchema.vote, {
      stripUnknown: true,
    }),
  )
  @UseBefore(json())
  @Routing.UseInterceptor(ProjectSerializer.serializeProjectDetails)
  voteProject(
    @Body() body: { token: string },
    @Param('id') id: number,
  ) {
    return ProjectService.voteForProject(id, body.token);
  }

  @Post('/:id/transfer')
  @UseBefore(json())
  addTransferRequest(
    @Param('id') id: number,
    @CurrentUser({ required: true }) user: User,
    @HeaderParam('X-Recaptcha-Response') captchaChallenge: string,
  ) {
    return ProjectService.addTransferRequest(
      id,
      user,
      captchaChallenge,
    );
  }

  @Post('/:id/settings')
  @Routing.UseInterceptor(MyProjectSerializer.serializeProjectEdit)
  @UseBefore(
    validateWith(ProjectSchema.settings, {
      stripUnknown: true,
    }),
  )
  @UseBefore(json())
  updateProjectSettings(
    @Body() body: ProjectSettings,
    @Param('id') id: number,
    @CurrentUser({ required: true }) user: User,
    @HeaderParam('X-Recaptcha-Response') captchaChallenge: string,
  ) {
    return ProjectService.updateProjectSettingsForArtist(
      id,
      body,
      user,
      captchaChallenge,
    );
  }
}
