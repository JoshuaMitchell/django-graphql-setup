import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from people.models import Person


class PersonNode(DjangoObjectType):
    class Meta:
        model = Person
        filter_fields = {
            "email": ["exact", "icontains", "istartswith", "iendswith"],
            "first_name": ["exact", "icontains", "istartswith", "iendswith"],
            "last_name": ["exact", "icontains", "istartswith", "iendswith"],
        }
        interfaces = (graphene.relay.Node, )


class Query(graphene.ObjectType):
    person = graphene.relay.Node.Field(PersonNode)
    all_people = DjangoFilterConnectionField(PersonNode)
