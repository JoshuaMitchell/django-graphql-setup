import graphene
from petitions.models import Petition
from petitions.schema.relay_petition_query import PetitionNode
from graphql_jwt.decorators import login_required


class CreatePetition(graphene.Mutation):
    class Arguments:
        headline = graphene.String()

    ok = graphene.Boolean()
    petition = graphene.Field(lambda: PetitionNode)

    @login_required
    def mutate(self, info, headline):
        petition = Petition.objects.create(headline=headline)
        ok = True
        return CreatePetition(petition=petition, ok=ok)


class Mutation(graphene.ObjectType):
    createPetition = CreatePetition.Field()
