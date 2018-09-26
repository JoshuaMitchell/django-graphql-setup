import graphene

# import users.schema.simple_user_schema
# import petitions.schema.simple_petition_schema
# import people.schema.simple_people_schema
#
# class Query(
#     users.schema.simple_user_schema.Query,
#     petitions.schema.simple_petition_schema.Query,
#     people.schema.simple_people_schema.Query,
#     graphene.ObjectType):
#     pass
#
# class Mutation(
#     people.schema.simple_people_schema.Mutation,
#     graphene.ObjectType):
#     pass
#
# schema = graphene.Schema(query=Query, mutation=Mutation)

import users.schema.relay_user_query
import users.schema.relay_user_mutation
import petitions.schema.relay_petition_query
import petitions.schema.relay_petition_mutation
import people.schema.relay_people_query
import people.schema.relay_people_mutation

class Query(
    users.schema.relay_user_query.Query,
    petitions.schema.relay_petition_query.Query,
    people.schema.relay_people_query.Query,
    graphene.ObjectType):
    node = graphene.relay.Node.Field()
    pass

class Mutation(
    users.schema.relay_user_mutation.Mutation,
    petitions.schema.relay_petition_mutation.Mutation,
    people.schema.relay_people_mutation.Mutation,
    graphene.ObjectType):
    pass



schema = graphene.Schema(query=Query, mutation=Mutation)
