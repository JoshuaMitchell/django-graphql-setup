import graphene
from graphene_django import DjangoObjectType
from people.models import Person
from petitions.models import Petition

class PersonType(DjangoObjectType):
    class Meta:
        model = Person


class Query(graphene.ObjectType):
    person = graphene.Field(PersonType, id=graphene.Int())
    all_people = graphene.List(PersonType)

    def resolve_person(self, info, **kwargs):
        id = kwargs.get('id')
        email = kwargs.get('email')

        if id is not None:
            return Person.objects.get(pk=id)

        if email is not None:
            return Person.objects.get(email=email)

        return None

    def resolve_all_people(self, info, **kwargs):
        return Person.objects.all()









class CreatePerson(graphene.Mutation):
    class Arguments:
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        zip_code = graphene.String()
        petition_id = graphene.Int()

    ok = graphene.Boolean()
    person = graphene.Field(lambda: PersonType)

    def mutate(self, info, first_name, last_name, email, zip_code, petition_id):
        petition = Petition.objects.get(pk=petition_id)
        if not petition:
            ok = False
            person = None
            return CreatePerson(person=person, ok=ok)

        person = Person.objects.create(first_name=first_name, last_name=last_name, email=email.lower(), zip_code=zip_code)
        print(person)
        person.petitions.add(petition)
        person.save()
        ok = True
        return CreatePerson(person=person, ok=ok)


class Mutation(graphene.ObjectType):
    createPerson = CreatePerson.Field()
