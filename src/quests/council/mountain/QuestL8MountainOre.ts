import {
  availableAmount,
  currentRound,
  Effect,
  Familiar,
  familiarWeight,
  getProperty,
  getWorkshed,
  handlingChoice,
  haveEffect,
  haveFamiliar,
  haveSkill,
  heistTargets,
  Item,
  itemAmount,
  Location,
  Monster,
  myAdventures,
  myLevel,
  print,
  pullsRemaining,
  Skill,
  toInt,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { AdventureFinder } from "../../../GreyChooser";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../utils/GreyResources";
import { GreySettings } from "../../../utils/GreySettings";
import { isTrainsetInUse } from "../../../utils/GreyTrainset";
import {
  getAllCombinations,
  getBackupsRemaining,
} from "../../../utils/GreyUtils";
import { Macro } from "../../../utils/MacroBuilder";
import { PropertyManager } from "../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { MountainStatus } from "../QuestL8IcePeak";

export class QuestL8MountainOre extends TaskInfo implements QuestInfo {
  mountainMan: Monster = Monster.get("Mountain Man");
  goose: Familiar = Familiar.get("Grey Goose");
  nanovision: Skill = Skill.get("Double Nanovision");
  wish: Item = Item.get("Pocket Wish");
  mines: Location = Location.get("Itznotyerzitz Mine");
  needRecalculate: boolean;
  burglar: Familiar = Familiar.get("Cat Burglar");
  faxAndGooseDupe: PossiblePath;
  failsafeBackup: PossiblePath;
  paths: PossiblePath[] = [];
  asbestos: Item = Item.get("asbestos ore");
  linoleum: Item = Item.get("linoleum ore");
  chrome: Item = Item.get("chrome ore");
  trainset: Item = Item.get("model train set");
  cmc: Item = Item.get("Cold Medicine Cabinet");

  getId(): QuestType {
    return "Council / Ice / Ore";
  }

  level(): number {
    return 8;
  }

  getOreRemaining(): number {
    return 3 - availableAmount(this.neededOre());
  }

  neededOre(): Item {
    return Item.get(getProperty("trapperOre") || "linoleum ore");
  }

  talkTrapper() {
    visitUrl("place.php?whichplace=mclargehuge&action=trappercabin");
  }

  canPull(): boolean {
    return (
      pullsRemaining() != 0 &&
      !getProperty("_roninStoragePulls")
        .split(",")
        .includes(toInt(this.neededOre()).toString())
    );
  }

  isHeistReady() {
    return (
      toInt(getProperty("catBurglarBankHeists")) > 0 ||
      toInt(getProperty("_catBurglarCharge")) >= 10
    );
  }

  hasHeistedAlready(): boolean {
    return toInt(getProperty("_catBurglarHeistsComplete")) > 0;
  }

  hasFamiliarRecommendation(): Familiar {
    if (!haveFamiliar(this.burglar)) {
      return null;
    }

    if (this.isHeistReady() || this.hasHeistedAlready()) {
      return null;
    }

    return this.burglar;
  }

  willUseTrainset(): boolean {
    return (
      isTrainsetInUse() ||
      (getWorkshed() == this.cmc &&
        itemAmount(this.trainset) > 0 &&
        GreySettings.greySwitchWorkshed == "Model train set")
    );
  }

  createPaths(assumeUnstarted: boolean): void {
    if (this.willUseTrainset()) {
      this.paths = [new PossiblePath(0)];
      return;
    }

    this.paths = [];

    this.needRecalculate = this.getStatus() < MountainStatus.TRAPPER_DEMANDS;
    this.faxAndGooseDupe = new PossiblePath(1)
      .add(ResourceCategory.YELLOW_RAY)
      .addFax(this.mountainMan);
    this.failsafeBackup = new PossiblePath(1).add(ResourceCategory.COPIER);

    if (this.doDuping()) {
      this.paths.push(this.faxAndGooseDupe);
    }

    if (this.canBackup()) {
      this.paths.push(this.failsafeBackup);
    }

    const resourceTypes: ResourceCategory[] = [];
    const needOres = assumeUnstarted ? 3 : this.getOreRemaining();

    for (let i = 0; i < needOres; i++) {
      resourceTypes.push(ResourceCategory.CLOVER);
      resourceTypes.push(ResourceCategory.POLAR_VORTEX);
    }

    resourceTypes.push(ResourceCategory.FAXER);
    resourceTypes.push(ResourceCategory.YELLOW_RAY);
    resourceTypes.push(ResourceCategory.COPIER);
    resourceTypes.push(ResourceCategory.CAT_HEIST);
    resourceTypes.push(ResourceCategory.PULL);

    resourceTypes.push(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT);

    const allCombinations = getAllCombinations(resourceTypes);

    for (const combo of allCombinations) {
      const oresExpected = combo
        .map((res) =>
          res == ResourceCategory.YELLOW_RAY
            ? 2
            : res == ResourceCategory.PULL ||
              res == ResourceCategory.COPIER ||
              res == ResourceCategory.CLOVER ||
              res == ResourceCategory.CAT_HEIST
            ? 1
            : 0
        )
        .reduce((p, n) => p + n, 0);

      // If this doesn't use a fax
      if (!combo.includes(ResourceCategory.FAXER)) {
        // Remove combinations that require a mountain man
        if (
          combo.includes(ResourceCategory.COPIER) ||
          combo.includes(ResourceCategory.POLAR_VORTEX) ||
          combo.includes(ResourceCategory.YELLOW_RAY)
        ) {
          continue;
        }

        // If the combo requires a cat heist, and a heist cannot be performed
        if (
          combo.includes(ResourceCategory.CAT_HEIST) &&
          (assumeUnstarted ||
            needOres != 1 ||
            !this.isHeistReady() ||
            this.hasHeistedAlready() ||
            !this.isHeistable())
        ) {
          continue;
        }
      }

      // If this combination wouldn't give enough ores
      if (oresExpected < needOres || oresExpected > needOres) {
        continue;
      }

      const advs = combo.filter(
        (res) =>
          res == ResourceCategory.CLOVER ||
          res == ResourceCategory.FAXER ||
          res == ResourceCategory.COPIER
      ).length;

      const path = new PossiblePath(advs);
      let addedPolar: boolean = false;

      for (const res of combo) {
        // If this is a polar and we already did a polar and doing a yellow ray, or this is something we're doing after the mountain man
        const doMaybe =
          combo.includes(ResourceCategory.YELLOW_RAY) &&
          combo.includes(ResourceCategory.POLAR_VORTEX) &&
          (res == ResourceCategory.POLAR_VORTEX
            ? addedPolar
            : res != ResourceCategory.FAXER &&
              res != ResourceCategory.YELLOW_RAY)
            ? 0.33
            : 1;

        if (res == ResourceCategory.PULL) {
          path.addConsumablePull(this.neededOre());
        } else if (res == ResourceCategory.FAXER) {
          path.addFax(this.mountainMan, doMaybe ? 0.33 : 1);
        } else {
          path.addMaybe(res, doMaybe ? 0.33 : 1);
          addedPolar = addedPolar || res == ResourceCategory.POLAR_VORTEX;
        }
      }

      this.paths.push(path);

      // If this is a fax, and we're not doing a heist or a copier
      if (
        combo.includes(ResourceCategory.FAXER) &&
        !combo.includes(ResourceCategory.COPIER) &&
        !combo.includes(ResourceCategory.CAT_HEIST)
      ) {
        const cargoShorts = path.clone();
        cargoShorts.advsSavedMin -= 1;
        cargoShorts.advsSavedMax -= 1;

        cargoShorts.resourcesNeeded.forEach((res) => {
          if (res[0] == ResourceCategory.FAXER) {
            res[0] = ResourceCategory.CARGO_SHORTS;
          }
        });

        if (!cargoShorts.ignoreResources.includes("Cosplay Saber")) {
          cargoShorts.addIgnored("Cosplay Saber");
        }

        this.paths.push(cargoShorts);
      }
    }

    // Ignore cosplay saber for any path that requires a proper fight finishing blow
    for (const path of this.paths) {
      if (
        path.canUse(ResourceCategory.CAT_HEIST) == 0 &&
        path.canUse(ResourceCategory.COPIER) == 0
      ) {
        continue;
      }

      path.addIgnored("Cosplay Saber");
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getStatus(): MountainStatus {
    return getQuestStatus("questL08Trapper");
  }

  status(path: PossiblePath): QuestStatus {
    if (this.willUseTrainset()) {
      return QuestStatus.COMPLETED;
    }

    const status = this.getStatus();

    if (status < MountainStatus.TRAPPER_DEMANDS) {
      return QuestStatus.NOT_READY;
    }

    if (status > MountainStatus.TRAPPER_DEMANDS) {
      return QuestStatus.COMPLETED;
    }

    if (this.getOreRemaining() <= 0) {
      return QuestStatus.COMPLETED;
    }

    if (this.needRecalculate) {
      return QuestStatus.READY;
    }

    if (path == null) {
      return QuestStatus.READY;
    }

    if (path.canUse(ResourceCategory.CAT_HEIST) && !this.isHeistReady()) {
      return QuestStatus.NOT_READY;
    }

    if (path == this.faxAndGooseDupe && !this.doDuping()) {
      return QuestStatus.NOT_READY;
    }

    if (
      this.lastBackup() == this.mountainMan &&
      (path.canUse(ResourceCategory.COPIER) ||
        path.canUse(ResourceCategory.CAT_HEIST))
    ) {
      return QuestStatus.READY;
    }

    if (
      haveEffect(Effect.get("Brother Corsican's Blessing")) +
        haveEffect(Effect.get("A Girl Named Sue")) >
      0
    ) {
      return QuestStatus.NOT_READY;
    }

    // If we haven't started this yet
    if (path.canUse(ResourceCategory.YELLOW_RAY)) {
      // If we have yellow ray active, or can't afford it
      if (!path.getResource(ResourceCategory.YELLOW_RAY).ready()) {
        return QuestStatus.NOT_READY;
      }

      // If we're doing a goose dupe
      if (this.doDuping()) {
        // If goose couldn't dupe
        if (familiarWeight(this.goose) < 6) {
          return QuestStatus.NOT_READY;
        }
      } else if (!haveSkill(this.nanovision)) {
        // If we don't have nanovision, and this will want to maybe do a backup, better delay.
        if (path.canUse(ResourceCategory.COPIER)) {
          return QuestStatus.NOT_READY;
        }
      }
    }

    return QuestStatus.READY;
  }

  mustBeDone(reallyMustBeDone: boolean): boolean {
    if (this.canBackup() || this.needRecalculate) {
      return true;
    }

    if (this.getOreRemaining() < 3) {
      return true;
    }

    if (myLevel() < 12) {
      return false;
    }

    if (this.isHeistReady() && this.isHeistable()) {
      return true;
    }

    if (myAdventures() < 40) {
      return false;
    }

    if (reallyMustBeDone) {
      return false;
    }

    if (
      this.doDuping() &&
      familiarWeight(this.goose) >= this.famWeightToDupe()
    ) {
      return true;
    }

    return true;
  }

  lastBackup(): Monster {
    return getProperty("lastCopyableMonster") == ""
      ? null
      : Monster.get(getProperty("lastCopyableMonster"));
  }

  canBackup(): boolean {
    return this.hasBackups() && this.lastBackup() == this.mountainMan;
  }

  hasBackups(): boolean {
    return getBackupsRemaining() > 0;
  }

  doPull(path: PossiblePath): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        GreyPulls.pullOre();

        path.addUsed(ResourceCategory.PULL);
      },
    };
  }

  doPackOfCardsCheat(path: PossiblePath): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        path
          .getResource(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT)
          .pickCard("Mine");
        path.addUsed(ResourceCategory.PULL);
      },
    };
  }

  doCopier(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit().setItemDrops();
    const loc = Location.get("The Dire Warren");

    const resource = path.getResource(ResourceCategory.COPIER);

    resource.prepare(outfit);

    return {
      location: loc,
      outfit: outfit,
      run: () => {
        greyAdv(
          loc,
          outfit,
          new AdventureSettings().setStartOfFightMacro(
            new Macro().if_(
              Monster.get("Fluffy Bunny"),
              path.getResource(ResourceCategory.COPIER).macro()
            )
          )
        );

        path.addUsed(ResourceCategory.COPIER);
      },
    };
  }

  isHeistable(): boolean {
    if (toInt(getProperty("_catBurglarCharge")) < 11) {
      return false;
    }

    const foundOre = Object.keys(heistTargets()).find(
      (k) => k.toLowerCase() == "mountain man"
    );

    // Get out of the choice
    visitUrl("main.php");

    return foundOre != null;
  }

  run(path: PossiblePath): QuestAdventure {
    if (this.needRecalculate) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          this.createPaths(false);
          AdventureFinder.recalculatePath();
        },
      };
    }

    if (
      this.getOreRemaining() < 3 &&
      path.canUse(ResourceCategory.CAT_HEIST) &&
      this.isHeistable()
    ) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          path
            .getResource(ResourceCategory.CAT_HEIST)
            .doHeist(this.neededOre());
        },
      };
    }

    if (
      path.canUse(ResourceCategory.FAXER) ||
      path.canUse(ResourceCategory.CARGO_SHORTS)
    ) {
      return this.doFaxers(path);
    }

    if (path.canUse(ResourceCategory.CLOVER)) {
      return this.doClover(path);
    }

    if (path.canUse(ResourceCategory.PULL) > 0) {
      return this.doPull(path);
    }

    if (path.canUse(ResourceCategory.COPIER)) {
      return this.doCopier(path);
    }

    if (path.canUse(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT)) {
      return this.doPackOfCardsCheat(path);
    }

    throw "Not sure what we should be doing";
  }

  doClover(path: PossiblePath): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        while (path.canUse(ResourceCategory.CLOVER)) {
          use(Item.get("11-leaf clover"));
          greyAdv(this.mines);
          path.addUsed(ResourceCategory.CLOVER);
        }
      },
    };
  }

  doFaxers(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.addWeight("DA").addWeight("DR").addWeight("ML", -1);

    if (path.canUse(ResourceCategory.POLAR_VORTEX) > 0) {
      path.getResource(ResourceCategory.POLAR_VORTEX).prepare(outfit);
    }

    if (path.canUse(ResourceCategory.YELLOW_RAY)) {
      path.getResource(ResourceCategory.YELLOW_RAY).prepare(outfit);
    }

    return {
      location: null,
      outfit: outfit,
      familiar: path.canUse(ResourceCategory.CAT_HEIST) ? this.burglar : null,
      disableFamOverride: path.canUse(ResourceCategory.CAT_HEIST) > 0,
      run: () => {
        if (this.doDuping()) {
          useFamiliar(this.goose);
        } else if (
          path.canUse(ResourceCategory.CAT_HEIST) &&
          this.isHeistReady()
        ) {
          useFamiliar(this.burglar);
        } else if (
          this.getOreRemaining() == 3 &&
          !path.canUse(ResourceCategory.PULL) &&
          !path.canUse(ResourceCategory.COPIER) &&
          !path.canUse(ResourceCategory.POLAR_VORTEX) &&
          !path.canUse(ResourceCategory.CLOVER)
        ) {
          throw "Something seems wrong, trying to call a faxer but we can probably only get 2 ores";
        }

        let macro: Macro = new Macro();

        const props = new PropertyManager();

        try {
          const yr = path.getResource(ResourceCategory.YELLOW_RAY);

          if (yr != null) {
            yr.prepare(null, props);
          }

          if (path.canUse(ResourceCategory.FAXER)) {
            path.getResource(ResourceCategory.FAXER).fax(this.mountainMan);
            path.addUsed(ResourceCategory.FAXER);
          } else if (path.canUse(ResourceCategory.CARGO_SHORTS)) {
            path.getResource(ResourceCategory.CARGO_SHORTS).pocket(565);
            path.addUsed(ResourceCategory.CARGO_SHORTS);
          } else {
            throw "No way to start a mountain man combat!";
          }

          if (currentRound() == 0) {
            throw "I should be in combat!";
          }

          if (this.doDuping()) {
            macro = macro.skill(Skill.get("Emit Matter Duplicating Drones"));
          } else if (path.canUse(ResourceCategory.POLAR_VORTEX)) {
            while (
              path.canUse(ResourceCategory.POLAR_VORTEX) &&
              this.getOreRemaining() > 2
            ) {
              print("Drop my ore dammit!", "red");
              path.getResource(ResourceCategory.POLAR_VORTEX).macro().submit();
              path.addUsed(ResourceCategory.POLAR_VORTEX);
            }

            if (this.getOreRemaining() > 2) {
              print(
                "Drat. We're going to have to get the last ore another way.",
                "red"
              );
            }
          }

          if (yr != null) {
            macro.step(yr.macro());
          }

          greyAdv(
            "main.php",
            outfit,
            new AdventureSettings().setStartOfFightMacro(macro)
          );
        } finally {
          props.resetAll();
        }

        if (currentRound() != 0 || handlingChoice()) {
          throw "Expected to have fight finished!";
        }
      },
    };
  }

  doDuping(): boolean {
    return familiarWeight(this.goose) >= this.famWeightToDupe();
  }

  famWeightToDupe(): number {
    if (this.neededOre() == this.asbestos) {
      return 6;
    } else if (this.neededOre() == this.linoleum) {
      return 8;
    } else if (this.neededOre() == this.chrome) {
      return 10;
    } else {
      throw "Unknown ore";
    }
  }

  getLocations(): Location[] {
    return [];
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
