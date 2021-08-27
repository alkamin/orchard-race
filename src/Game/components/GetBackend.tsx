import { BackendProps, Backend } from "../../types";
import JotaiBackend from "./JotaiBackend";
import ValtioBackend from "./ValtioBackend";
import ZustandBackend from "./ZustandBackend";

type GetBackendProps = BackendProps & {
  backend: Backend;
};

const GetBackend = ({ backend, children }: GetBackendProps) => {
  switch (backend) {
    case Backend.Zustand:
      return <ZustandBackend>{(api) => children(api)}</ZustandBackend>;
    case Backend.Jotai:
      return <JotaiBackend>{(api) => children(api)}</JotaiBackend>;
    case Backend.Valtio:
      return <ValtioBackend>{(api) => children(api)}</ValtioBackend>;
  }
};

export default GetBackend;
