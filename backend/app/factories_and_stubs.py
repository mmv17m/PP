from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession





def get_session_stub() -> AsyncSession:
    return None


def sqlalchemy_repo_factory_maker(dependency):
    def factory(session: AsyncSession = Depends(get_session_stub)): 
        return dependency(session)

    return factory

