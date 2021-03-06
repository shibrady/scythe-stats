import { FC } from 'react';
import { StyledTable, StyledHeadCell } from 'baseui/table-grid';

import GQL from 'lib/graphql';

import PlayerRow from './player-row';

interface Props {
  players: Array<
    Pick<
      GQL.Player,
      'id' | 'displayName' | 'steamId' | 'totalWins' | 'totalMatches'
    >
  >;
  className?: string;
}

const PlayerTable: FC<Props> = ({ players, className }) => {
  const rows = players.map(({ displayName, totalWins, totalMatches }) => {
    return {
      displayName,
      totalWins,
      totalMatches,
    };
  });

  return (
    <StyledTable className={className} $gridTemplateColumns="auto auto auto">
      <StyledHeadCell>Player</StyledHeadCell>
      <StyledHeadCell>Total Wins</StyledHeadCell>
      <StyledHeadCell>Win Rate</StyledHeadCell>
      {rows.map((row, index) => {
        const striped = index % 2 !== 0;
        return <PlayerRow key={index} {...row} striped={striped} />;
      })}
    </StyledTable>
  );
};

export default PlayerTable;
