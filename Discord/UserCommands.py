"""
    User Commands cog for East
    Holds all user specific commands, those things that alter a user's permissions, roles,
    East knowledge of them, so on.

    Author: CraftSpider, HiddenStorys
"""
import discord
from discord.ext import commands


class UserCommands:
    """These commands can be used by anyone, as long as East is awake.\nThe effects will apply to the person using the command."""

    __slots__ = ['bot']

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def color(self, ctx, color: str):
        """Changes the User's color, if East has role permissions."""
        color_role = None
        if not color.startswith("#") or len(color) is not 7 and len(color) is not 4:
            await ctx.send("Hey! That's not a color.")
            return

        for role in ctx.author.roles:
            if role.name.startswith("<EAST COLOR>"):
                await ctx.author.remove_roles(role)

        discord_color = None
        try:
            if len(color) == 7:
                discord_color = discord.Colour(int(color[1:], 16))
            elif len(color) == 4:
                color = color[1:]
                result = ""
                for item in color:
                    result += item*2
                discord_color = discord.Colour(int(result, 16))
                color = "#{}".format(result)
        except ValueError:
            await ctx.send("Hey! That's not a color that works.")
            return

        for role in ctx.guild.roles:
            if role.name.startswith("<EAST COLOR>") and role.color == discord_color:
                color_role = role
        if color_role is not None:
            await ctx.author.add_roles(ctx.author, color_role)
        else:
            color_role = await ctx.guild.create_role(name="<EAST COLOR>", color=discord_color)
            # print(ctx.guild.me.top_role.position)
            try:
                await color_role.edit(position=ctx.guild.me.top_role.position - 1)
            except discord.errors.InvalidArgument:
                pass
            await ctx.author.add_roles(color_role)

        await ctx.send("{0.name}'s color changed to {1}!".format(ctx.message.author, color))
    
    
def setup(bot):
    bot.add_cog(UserCommands(bot))
