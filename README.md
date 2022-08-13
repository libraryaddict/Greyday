Script for grey me

Be sure to check out the other grey you script! Currently, that script will perform better for the majority of players.

https://github.com/Kasekopf/loop-casual/tree/gyou

The following commands are supported.

`greyday help` - View the help

`greyday sim` - Prepares to run grey you, without running it

`greyday settings` - Prepares to run grey you, without running it

`greyday required` - Checks your stuff and tells you what you're lacking or not.

`greyday resources` - Can be run in path or aftercore, it will predict a path it'd take to complete your run. If it fails, then the script definitely can't do Grey You for you.

`greyday run` - Runs one turn, then exits

`greyday run <turns>` - Runs <turns> turns, then exits

**Installation**

Installation of this script is fairly easy.
To try this script, use this command in Mafia's CLI

```text
svn checkout https://github.com/libraryaddict/Greyday/branches/release/
```

**Moon Signs**

You can pick whatever moon sign you like, all the areas should be supported.

If you are low IOTM, then picking Marmot may be the best idea for the +1 res. This is mainly helpful for Ice Peak, Haunted Kitchen, A-Boo Peak and a few other tests.
If you have low progression in this path, picking Vole is a decent idea for the extra MP and HP.

If you have the rune moon spoon, then you should pick up a knoll moon sign, and set the property `greyTuneMoonSpoon` to another moon sign. I myself recommend a gnome sign.

So I ascend with the moon sign `Vole` for the 20% combat initiative, and extra 20 MP/HP. As well as knoll access.
Then I set `greyTuneMoonSpoon` to `blender` so that when I break the prism, I get 5 adventures from drinking. As well as unlocking Torso Awareness and other gnome related skills.

**Workshed**

Your workshed also doesn't matter\* but there are some notes.

In Hardcore, your Cold Medicine Cabinet will be used to grab a few pieces of equipment.
The remaining uses, or all of them in softcore. Your Cold Medicine Cabinet will be used to grab Extrovermectin™ whenever available.

Your Asdon Martin will be used, but notably the only ways it currently uses the Asdon Martin is for the banishes and for +meat when doing nuns.

I myself like to use Asdon Martin for my runs, then when I break prism. Buff myself with a thousand turns of +meat for garbo, then switch to Cold Medicine Cabinet.
The next day before I ascend into Grey You, I switch back to Asdon Martin.

**Requirements**

You may be able to run the script with just Grey Goose, but you're very unlikely to make it far.

Using iotms such as vip invitation, and more will increase your game experience.

Run this to get an idea of what we want.

`greyday required`