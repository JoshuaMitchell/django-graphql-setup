import graphene
import graphql_jwt
from users.models import User
from users.schema.relay_user_query import UserNode




class Mutation(graphene.ObjectType):
    login = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
