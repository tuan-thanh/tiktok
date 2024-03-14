import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4333fc1ca041b0cdc74ce535ec3b0ee4~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1709974800&x-signature=0LtjqWhm09mm3Sfjc%2Fu1FTIrQQY%3D"
                    alt=""
                />

                <Button className={cx('follow-btn')} primary>
                    Follow
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>huyenanh</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>Huyền Anh</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>7.9M </strong>
                    <span className={cx('label')}>Follower</span>
                    <strong className={cx('value')}>10.1M </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
