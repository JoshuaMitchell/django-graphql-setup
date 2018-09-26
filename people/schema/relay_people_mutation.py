import graphene
from graphql_relay.node.node import from_global_id
from people.models import Person
from petitions.models import Petition
from people.schema.relay_people_query import PersonNode
from petitions.schema.relay_petition_query import PetitionNode

class CreatePerson(graphene.Mutation):
    class Arguments:
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        zip_code = graphene.String()
        petition_id = graphene.String()

    ok = graphene.Boolean()
    person = graphene.Field(lambda: PersonNode)

    def mutate(self, info, first_name, last_name, email, zip_code, petition_id):
        #from_global_id returns tuple
        _id = from_global_id(petition_id)[1]
        petition = Petition.objects.get(pk=_id)
        if not petition:
            ok = False
            person = None
            return CreatePerson(person=person, ok=ok)
        person = Person.objects.create(first_name=first_name, last_name=last_name, email=email.lower(), zip_code=zip_code)
        person.petitions.add(petition)
        person.save()
        ok = True
        return CreatePerson(person=person, ok=ok)


class Mutation(graphene.ObjectType):
    createPerson = CreatePerson.Field()
