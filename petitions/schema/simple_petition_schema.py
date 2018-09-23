import graphene
from graphene_django import DjangoObjectType
from petitions.models import Petition


class PetitionType(DjangoObjectType):
    class Meta:
        model = Petition


class Query(object):
    petition = graphene.Field(PetitionType, id=graphene.Int())
    all_petitions = graphene.List(PetitionType)

    def resolve_petition(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Petition.objects.get(pk=id)

        return None

    def resolve_all_petitions(self, info, **kwargs):
        return Petition.objects.all()
