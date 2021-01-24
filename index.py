import discord
import json
import os 
import random
from discord.ext import commands, tasks
from itertools import cycle

os.chdir("C:\\Users\\simon\\Desktop\\Phython bot")

# Client
client = commands.Bot(command_prefix = ">")
status = cycle(['BETA', 'Economy'])
@client.command()

async def test(ctx):
    await ctx.send('Working')



# Description
@client.event
async def on_ready():
        change_status.start()
        print('Bot Is Ready')

# Status
@tasks.loop(seconds=10)
async def change_status():
    await client.change_presence(activity=discord.Game(next(status)))
 
# Ping
@client.command()
async def ping(ctx):
    await ctx.send(f'Pong! {round(client.latency * 1000)}ms')

# Clear
@client.command()
async def clear(ctx, amount=5):
    await ctx.channel.purge(limit=amount)
    await ctx.send(f'I have Deleted **{amount}** Message(s)', delete_after=10)

# BETA Economy
mainshop = [{"name":"Tidepod","price":100,"description":"Risking your life for a multiplier? Sounds great!"},
            {"name":"Pepe","price":500,"description":"Only the rarest of the rare pepes. A flex item."}]

# BETA Shop
@client.command()
async def shop(ctx):
    em = discord.Embed(title = "Shop Items")

    for item in mainshop:
        name = item["name"]
        price = item["price"]
        desc = item["description"]
        em.add_field(name = name, value = f"${price} | {desc}")

    await ctx.send(embed = em)


# BETA 

@client.command()
async def balance(ctx):
    await open_account(ctx.author)
    user = ctx.author
    users = await get_bank_data()

    wallet_amt = users[str(user.id)] ["wallet"]
    bank_amt = users[str(user.id)] ["bank"]

    em = discord.Embed(title = f"{ctx.author.name}'s balance",color = discord.Color.Blue())
    em.add_field(name = "Wallet", value = wallet_amt)
    em.add_field(name = "Bank", value = bank_amt)
    await ctx.send(embed = em)


async def open_account(user):
        users = await get_bank_data()

    if str(user.id) in users:
        return False
    else:
        users[str(user.id)] = {}
        users[str(user.id)]["wallet"] = 0
        users[str(user.id)]["bank"] = 0

    with open("mainbank.json", "w") as f:
        json.dump(users,f)
        return True

async def get_bank_data():
    with open("mainbank.json", "r") as f:
        users = json.load(f)
        return users


# Run Client
client.run('ODAxNTgxNzc1MzA2MjI3NzIy.YAixMw.dW_eTrxjP7GazWzWLgSdDy5jgdo')