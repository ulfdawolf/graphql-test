import { GQLServerContextType } from "../data-sources/types";
import { SessionParamsType } from "../data-sources/session-api";

export const Mutation = {
  toggleSessionFavorite: (
    _: undefined,
    args: SessionParamsType,
    ctx: GQLServerContextType,
  ) => {
    return ctx.dataSources.sessionAPI.toggleSessionFavorite(args.id);
  },
  addNewSession: (
    _: undefined,
    args: SessionParamsType,
    ctx: GQLServerContextType,
  ) => {
    return ctx.dataSources.sessionAPI.addNewSession(args.session);
  },
};
