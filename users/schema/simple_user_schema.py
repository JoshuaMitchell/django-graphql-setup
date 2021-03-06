import graphene
from graphene_django import DjangoObjectType
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User


class Query(object):
    user = graphene.Field(UserType, id=graphene.Int(), email=graphene.String())
    all_users = graphene.List(UserType)

    def resolve_user(self, info, **kwargs):
        id = kwargs.get('id')
        email = kwargs.get('email')

        if id is not None:
            return User.objects.get(pk=id)

        if email is not None:
            return User.objects.get(email=email)

        return None

    def resolve_all_users(self, info, **kwargs):
        return User.objects.all()
