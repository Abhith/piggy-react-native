import * as React from "react"
import { observer } from "mobx-react"
import { NavigationScreenProps } from "react-navigation"
import { GiftedChat } from "react-native-gifted-chat"
import { TransactionSnapshot } from "../../../models/transaction/transaction"
import moment from "moment"
import { TransactionStore } from "../../../models/tranasction-store"

export interface TransactionCommentsScreenProps extends NavigationScreenProps<{}> {
  transaction: TransactionSnapshot
  transactionStore: TransactionStore
}

// @inject("mobxstuff")
@observer
export class TransactionComments extends React.Component<
  TransactionCommentsScreenProps,
  {
    messages: any
  }
> {
  constructor(props: TransactionCommentsScreenProps) {
    super(props)
    this.state = {
      messages: [],
    }
  }
  componentWillMount() {
    this.refreshComments()
  }

  refreshComments() {
    this.props.transactionStore.getTransactionComments(this.props.transaction.id).then(res => {
      // console.log("comments", res);
      this.mapComments(res.comments)
    })
  }

  mapComments = comments => {
    let transactionMessage = ""
    if (this.props.transaction.amount > 0) {
      transactionMessage += "Inflow"
    } else {
      transactionMessage += "Outflow"
    }

    transactionMessage +=
      " of " +
      this.props.transaction.amount.toString() +
      " in " +
      this.props.transaction.account.name +
      " account of " +
      this.props.transaction.creatorUserName +
      ". Category is " +
      this.props.transaction.category.name +
      " (" +
      this.props.transaction.description +
      ")."
    let mappedItems = [
      {
        _id: 1,
        text: transactionMessage,
        createdAt: new Date(this.props.transaction.transactionTime),
        user: {
          _id: 2,
          name: this.props.transaction.creatorUserName,
          // avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
      },
    ]
    comments.forEach(comment => {
      let mappedItem = {
        _id: comment.id,
        text: comment.content,
        createdAt: moment.utc(comment.creationTime).toDate(),
        user: {
          _id: comment.creatorUserId,
          name: comment.creatorUserName,
          // avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
        // image: 'https://facebook.github.io/react/img/logo_og.png',
        // Any additional custom parameters are passed through
      }
      mappedItems.unshift(mappedItem)
    })

    this.setState({
      messages: mappedItems,
    })
  }

  onSend(messages = []) {
    messages.forEach(message => {
      this.props.transactionStore
        .saveTransactionComment(this.props.transaction.id, message.text)
        .then(() => {
          this.refreshComments()
        })
    })
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}
