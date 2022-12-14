import { toInt, getProperty, myMeat } from "kolmafia";

export function getBackupChoices(): [number, number][] {
  const backupChoices: [number, number][] = [];

  const choices = (choiceNumber: number, ...choices: number[]) => {
    for (const choice of choices) {
      backupChoices.push([choiceNumber, choice]);
    }
  };

  // Sleazy back alley
  choices(112, 1);
  choices(110, 4);
  choices(109, 1);
  choices(108, 4);
  choices(31, 2);

  // Skeleton Office
  choices(1060, 4, 1);

  // Madness Bakery
  choices(1061, 1, 4);

  // Overgrown lot
  choices(1062, 5, 3);

  // Deep Machine
  choices(1119, 6);

  // NEP
  choices(1322, 6);
  choices(1324, 5);

  // Manor pantry
  choices(888, 4);
  choices(889, 5);
  choices(114, 2);
  choices(115, 1);
  choices(116, 4);
  choices(117, 1);

  // Manor library
  choices(163, 3);

  // Manor billards
  choices(875, 1, 3);

  // Manor gallery
  choices(91, 2);
  choices(89, 6);

  // Manor bathroom
  choices(90, 3);
  choices(106, 3);
  choices(107, 4);
  choices(105, 2);
  choices(402, 3);
  choices(882, 1);

  // Manor bedroom
  choices(876, 1);
  choices(877, 1);
  choices(878, 4);
  choices(879, 4, 2);
  choices(880, 1, 2);

  // Manor babies
  choices(884, 1);
  choices(885, 1);
  choices(886, 1);

  // Palin
  choices(180, 2);
  choices(127, 1);
  choices(126, 1);

  // Airship
  choices(178, 2);
  choices(182, 4, 1);
  choices(669, 1, 4);
  choices(670, 1, 5);
  choices(671, 1);
  choices(672, 3);
  choices(673, 3);
  choices(674, 3);
  choices(677, 2, 1);
  choices(678, 1);
  choices(1026, 2);
  choices(1431, 1);
  choices(676, 1);
  choices(675, 1);

  // Knob Goblin
  choices(76, 3);
  choices(111, 3);
  choices(113, 1, 2);
  choices(118, 2);
  choices(120, 4);
  choices(522, 2);

  // Crypts
  choices(153, 4);
  choices(157, 4);
  choices(155, 4, 5);
  choices(523, 4);
  choices(527, 2);

  // Distant woods
  // The NC
  choices(502, 2);
  choices(505, 2);

  choices(46, 3);
  choices(47, 2);
  choices(73, 2);
  choices(74, 2);
  choices(75, 2);
  choices(511, 2);
  choices(512, 2);
  choices(579, 2);
  choices(581, 3);
  choices(582, 1);
  choices(584, 4);
  choices(794, 1);
  choices(795, 1);
  choices(796, 2);
  choices(798, 1);
  choices(923, 1);
  choices(924, 1);

  // Hidden city
  choices(785, 6);
  choices(783, 6);
  choices(781, 6);
  choices(787, 6);
  choices(791, 6);
  choices(788, 1);
  choices(786, 1);
  choices(789, 6);
  choices(784, 1);
  choices(780, 6);
  choices(787, 1, 6);
  choices(685, 1, 6);
  choices(783, 1, 6);
  choices(781, 1, 6);

  // Smut orcs
  choices(1345, 3);

  // Daily dungeon
  choices(692, 3, 8);
  choices(693, 2, 3);
  choices(690, 2);
  choices(691, 2);
  choices(689, 1);

  // Mountains
  choices(25, 3);
  choices(297, 3);
  choices(451, 1);

  // Mountain Peak
  choices(15, 3);
  choices(16, 3);
  choices(17, 3);
  choices(575, 3);
  choices(18, 3);
  choices(19, 3);
  choices(20, 3);
  choices(556, 2);

  // Protesters
  choices(856, 2);
  choices(857, 2);
  choices(858, 2);

  // Desert
  choices(4, 3);
  choices(929, 6);

  // Desert vacation
  choices(793, 4);

  // Island
  choices(22, 3);
  choices(23, 3);
  choices(24, 2);
  choices(72, 2);
  choices(138, 4);
  choices(136, 3);
  choices(137, 3);
  choices(181, 2);
  choices(1433, 3, 1, 2);
  choices(1434, 2, 3, 1);

  // Island war
  choices(147, 3);
  choices(148, 1);
  choices(149, 2);

  choices(139, 3);
  choices(140, 3);
  choices(141, 2);
  choices(142, 3, 2);
  choices(143, 3);
  choices(144, 3);
  choices(145, 2);
  choices(146, 3, 2);

  // Signed zones
  choices(5, 2);

  choices(696, 1, 2);
  choices(697, 1, 2);
  choices(698, 1, 2);

  // Manor lights
  for (const choiceNo of [
    890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903,
  ]) {
    choices(choiceNo, 1, 2, 3);
  }

  // Lil Doctor Bag, turn it off today if we have all upgrades. Otherwise accept.
  choices(1340, toInt(getProperty("doctorBagUpgrades")) >= 5 ? 3 : 1);
  choices(1341, 1);

  // Haunted dog
  choices(1108, 1); // Food
  choices(1106, 3); //Dog chow
  choices(1107, myMeat() < 6000 ? 3 : 1); // Meat or tennis ball

  // Gingerbread city
  choices(1215, 1); // Set the clock forward

  return backupChoices;
}
