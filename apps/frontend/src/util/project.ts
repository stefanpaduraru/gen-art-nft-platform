import { ProjectMetadata, ScriptTypes } from "../types/project";

export const getProjectPlaceholder = (id: number) =>
  `/images/placeholders/${(id || 0) % 10}.png`;

export const defaultStringMetadata = `{"aspectRatio": 1, "scriptType": "${ScriptTypes.P5JS}"}`;
export const defaultObjectMetadata: ProjectMetadata = {
  aspectRatio: 1,
  scriptType: ScriptTypes.P5JS,
};
