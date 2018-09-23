import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from petitions.models import Petition


class PetitionNode(DjangoObjectType):
    class Meta:
        model = Petition
        filter_fields = {
            "headline": ["exact", "icontains", "istartswith", "iendswith"],
        }
        interfaces = (graphene.relay.Node, )

    # @classmethod
    # def get_node(cls, info, id):
    #     return get_petition(id)


class Query(graphene.ObjectType):
    petition = graphene.relay.Node.Field(PetitionNode)
    all_petitions = DjangoFilterConnectionField(PetitionNode)
