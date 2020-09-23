import React,{ useState, useEffect } from 'react';
import classNames from "classnames";
import { useTranslation } from 'react-i18next';
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CustomButtons from "components/CustomButtons/Button.js";
import Avatar from '@material-ui/core/Avatar';
import { isEmpty } from 'features/helpers/utils';
import {StyledTableCell,StyledTableRow,stakePoolsStyle} from "../jss/sections/stakePoolsStyle";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import leftImage from 'assets/img/stake-head-left.png';
import rightImage from 'assets/img/stake-head-right.png';
import { useFetchPoolsInfo } from '../redux/hooks';

const useStyles = makeStyles(stakePoolsStyle);

export default function StakePools(props) {
  const { fromPage } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { pools, poolsInfo, fetchPoolsInfo } = useFetchPoolsInfo();

  useEffect(() => {
    fetchPoolsInfo();
  }, [fetchPoolsInfo]);
  
  return (
    <GridContainer spacing={3}>
      <GridItem>
        <div className={classes.mainTitle}>{t('Stake-Main-Title')}</div>
        <h3 className={classes.secondTitle}>{t('Stake-Second-Title')}</h3>
      </GridItem>
      {
        fromPage == 'page' && 
        <Hidden xsDown>
          <GridItem>
            <div className={classes.listHeader}>
              <img className={classes.leftImage} src={leftImage} />
              <img className={classes.rightImage} src={rightImage} />
              <div className={classes.mainTitle}>{t('Stake-List-Header-Main')}</div>
              <GridContainer >
                <GridItem className={classNames({
                  [classes.flexBox]:true,
                  [classes.marginTop]:true,
                })}>
                  <div className={classes.secondTitle}>{t('Stake-List-Header-Sub')}</div>
                  <CustomButtons
                    href='https://docs.yfii.finance/#/yield-farming'
                    target="_blank"
                    className={classes.learnMoreButton}
                  >
                    {t('Stake-Learn-More')}
                  </CustomButtons>
                </GridItem>
              </GridContainer>
            </div>
          </GridItem>
        </Hidden>
      }
      <Hidden xsDown>
        <GridItem>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell >{t('Stake-Table-Pool')}</StyledTableCell>
                <StyledTableCell >{t('Stake-Table-Staked')}</StyledTableCell>
                <StyledTableCell >{t('Stake-Table-Total')}</StyledTableCell>
                <StyledTableCell >{t('Stake-Table-Pay')}</StyledTableCell>
                <StyledTableCell ></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody classes={{
              root:classes.tableBodyRoot
            }}>
              {pools.map((pool, index) => (
                <StyledTableRow key={pool.name} style={{display: Boolean(index !== 3) ? "none" : "table-row"}}>
                  <StyledTableCell component="th">
                    <div className={classes.firstCell}>
                      <div className={classes.avatarContainer}>
                        <Avatar 
                          alt={pool.name}
                          src={require(`../../../images/${pool.name}-logo.png`)}
                          className={classNames({
                            [classes.avatar]:true,
                          })}
                          />
                      </div>
                      <div className={classes.firstCellContent}>
                        <div>{pool.name}</div>
                        <div>{pool.token}</div>
                      </div>
                    </div>
                  </StyledTableCell>
                  {/* <StyledTableCell >$40,027,383.88</StyledTableCell> */}
                  <StyledTableCell >{poolsInfo[index].staked}</StyledTableCell>
                  <StyledTableCell >{poolsInfo[index].tvl}</StyledTableCell>
                  <StyledTableCell >{poolsInfo[index].pay}</StyledTableCell>
                  <StyledTableCell component="th" >
                    <CustomButtons
                      href={`/#/stake/pool/${index + 1}`}
                      className={classes.stakeButton}
                    >
                      {t('Stake-Button-Stake')}
                    </CustomButtons>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </GridItem>
      </Hidden>
      <Hidden smUp>
        <GridItem>
        {pools.map((pool, index) => (
          <div key={`mobile-${index}`} className={classes.mobileContainer} style={{display: Boolean(index !== 3) ? "none" : ""}}>
            <div className={classes.avatarContainer} style={{width:'60px',height:'60px',borderRadius:'30px'}}>
              <Avatar 
                alt={pool.name}
                src={require(`../../../images/${pool.name}-logo.png`)}
                className={classNames({
                  [classes.avatar]:true,
                })}
                />
            </div>
            <div className={classes.mobileHead}>
              <div style={{fontWeight:'600',marginBottom:'6px'}}>{pool.name}</div>
              <div style={{fontWeight:'500'}}>{pool.token}</div>
            </div>
            <div className={classes.mobileDetail}>
              <div style={{fontWeight:'500',marginBottom:'6px'}}>{t('Stake-Table-Pay')+": "+poolsInfo[index].pay}</div>
              <div style={{fontWeight:'500',marginBottom:'6px'}}>{t('Stake-Table-Staked')+": "+poolsInfo[index].staked}</div>
              <div style={{fontWeight:'500',marginBottom:'6px'}}>{t('Stake-Table-Total')+": "+poolsInfo[index].tvl}</div>
            </div>
            <CustomButtons
              href={`/#/stake/pool/${index + 1}`}
              className={classes.stakeButton}
              style={{width:'150px'}}
            >
              {t('Stake-Button-Stake')}
            </CustomButtons>
          </div>
        ))}
        </GridItem>
      </Hidden>
    </GridContainer>
  )
}

StakePools.defaultProps = {
  fromPage:'page',
}