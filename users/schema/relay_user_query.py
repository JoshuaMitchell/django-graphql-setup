import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from users.models import User
from graphql_jwt.decorators import login_required


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = {
            "email": ["exact", "icontains", "istartswith", "iendswith"],
            "first_name": ["exact", "icontains", "istartswith", "iendswith"],
            "last_name": ["exact", "icontains", "istartswith", "iendswith"],
        }
        exclude_fields = ("password",)
        interfaces = (graphene.relay.Node, )


class Query(graphene.ObjectType):
    user = graphene.relay.Node.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)
    me = graphene.Field(UserNode)

    @login_required
    def resolve_me(self, info, **kwargs):
        return info.context.user
